import Paho from 'paho-mqtt';

export const MQTT_CONFIG = {
  broker: 'fc1c2174ffcb47ca88aa28238dab2eac.s1.eu.hivemq.cloud',
  port: 8884,
  path: '/mqtt',
  username: 'gogulgupta',
  password: 'Gogul12345678',
  dataTopic: 'gogul/agriculture/data',
  statusTopic: 'gogul/agriculture/status',
  relayTopic: 'gogul/agriculture/relay',
  controlTopic: 'gogul/agriculture/control'
};

// Global reference for active client to allow direct publishing from any component
let globalClient = null;
let lastManualCommandTime = 0;
let lastManualTargetState = null;

/**
 * Robust Eclipse Paho MQTT client over WebSockets (WSS).
 * Works reliably in all modern browsers (Safari, Chrome, Firefox, Edge).
 */
export function connectMqtt({ onMessage, onStatusChange, onError, onLog, onDeviceStatus, onRelayStatus }) {
  let isDisconnectedExplicitly = false;
  let reconnectTimer = null;
  const clientId = 'krishi_web_' + Math.random().toString(16).substring(2, 10);

  const client = new Paho.Client(
    MQTT_CONFIG.broker,
    Number(MQTT_CONFIG.port),
    MQTT_CONFIG.path,
    clientId
  );

  globalClient = client;

  const log = (msg) => {
    if (onLog) onLog(msg);
  };

  client.onConnectionLost = (responseObject) => {
    if (onStatusChange) onStatusChange('disconnected');
    if (responseObject.errorCode !== 0) {
      log(`Connection lost: ${responseObject.errorMessage}`);
      if (onError) onError(new Error(responseObject.errorMessage));
    } else {
      log('MQTT disconnected cleanly.');
    }

    // Auto-reconnect if not disconnected explicitly
    if (!isDisconnectedExplicitly) {
      if (onStatusChange) onStatusChange('reconnecting');
      reconnectTimer = setTimeout(() => {
        log('Attempting automatic reconnection to HiveMQ...');
        doConnect();
      }, 4000);
    }
  };

  client.onMessageArrived = (message) => {
    const topic = message.destinationName;
    const rawText = (message.payloadString || '').trim();

    if (topic === MQTT_CONFIG.statusTopic) {
      if (rawText.toUpperCase() === 'ON' || rawText === '1') {
        if (onRelayStatus && (Date.now() - lastManualCommandTime > 2000 || lastManualTargetState === true)) {
          onRelayStatus(true);
        }
        log(`Relay status from ESP32: ON`);
      } else if (rawText.toUpperCase() === 'OFF' || rawText === '0') {
        if (onRelayStatus && (Date.now() - lastManualCommandTime > 2000 || lastManualTargetState === false)) {
          onRelayStatus(false);
        }
        log(`Relay status from ESP32: OFF`);
      } else {
        if (onDeviceStatus) onDeviceStatus(rawText);
        log(`Device status notification: [${rawText}]`);
      }
      return;
    }

    if (topic === MQTT_CONFIG.controlTopic || topic === MQTT_CONFIG.relayTopic) {
      log(`Control command acknowledged on ${topic}: ${rawText}`);
      return;
    }

    try {
      const payload = JSON.parse(rawText);
      // Telemetry (soil, temp, humidity, rain) is passed to onMessage
      // Note: We deliberately do NOT let telemetry packets overwrite the user's manual switch!
      if (onMessage) {
        onMessage(payload, rawText, topic);
      }
    } catch (e) {
      log(`Raw message on ${topic}: ${rawText}`);
    }
  };

  const doConnect = () => {
    if (onStatusChange) onStatusChange('connecting');
    log(`Connecting to wss://${MQTT_CONFIG.broker}:${MQTT_CONFIG.port}${MQTT_CONFIG.path}...`);

    client.connect({
      useSSL: true,
      userName: MQTT_CONFIG.username,
      password: MQTT_CONFIG.password,
      timeout: 10,
      keepAliveInterval: 60,
      cleanSession: true,
      onSuccess: () => {
        if (onStatusChange) onStatusChange('connected');
        log(`Connected to HiveMQ Cloud SSL WebSocket (Port ${MQTT_CONFIG.port})!`);

        // Subscribe to data topic (telemetry)
        client.subscribe(MQTT_CONFIG.dataTopic, {
          onSuccess: () => {
            log(`Subscribed to data topic: ${MQTT_CONFIG.dataTopic}`);
          },
          onFailure: (err) => {
            log(`Failed to subscribe to ${MQTT_CONFIG.dataTopic}: ${err.errorMessage}`);
          }
        });

        // Subscribe to status topic (online, ON, OFF)
        client.subscribe(MQTT_CONFIG.statusTopic, {
          onSuccess: () => {
            log(`Subscribed to status topic: ${MQTT_CONFIG.statusTopic}`);
          },
          onFailure: () => {}
        });

        // Subscribe to control topic
        client.subscribe(MQTT_CONFIG.controlTopic, {
          onSuccess: () => {
            log(`Subscribed to control topic: ${MQTT_CONFIG.controlTopic}`);
          },
          onFailure: () => {}
        });
      },
      onFailure: (err) => {
        if (onStatusChange) onStatusChange('error');
        if (onError) onError(err);
        log(`Connection failed: ${err.errorMessage || 'Unknown error'}`);

        if (!isDisconnectedExplicitly) {
          reconnectTimer = setTimeout(doConnect, 5000);
        }
      }
    });
  };

  doConnect();

  const publish = (topic, payload) => {
    try {
      if (client && client.isConnected()) {
        const payloadStr = typeof payload === 'object' ? JSON.stringify(payload) : String(payload);
        const msg = new Paho.Message(payloadStr);
        msg.destinationName = topic;
        client.send(msg);
        log(`Published to ${topic}: ${payloadStr}`);
        return true;
      } else {
        log(`Cannot publish - MQTT client not connected.`);
        return false;
      }
    } catch (e) {
      log(`Publish error: ${e.message}`);
      return false;
    }
  };

  return {
    disconnect: () => {
      isDisconnectedExplicitly = true;
      if (reconnectTimer) clearTimeout(reconnectTimer);
      try {
        if (client.isConnected()) {
          client.disconnect();
        }
      } catch (e) {
        console.error('Error disconnecting client:', e);
      }
    },
    publish,
    client
  };
}

/**
 * Helper to publish relay ON/OFF command to HiveMQ Cloud.
 * Sends raw string "ON" or "OFF" directly to MQTT_CONTROL_TOPIC ("gogul/agriculture/control")
 * as expected by ESP32 mqttCallback. No JSON, no voltage object.
 * @param {'ON' | 'OFF' | boolean | number} state 
 */
export function publishRelayCommand(state) {
  const isTurnOn = state === 'ON' || state === 1 || state === true || String(state).toUpperCase() === 'ON';
  const commandStr = isTurnOn ? 'ON' : 'OFF';
  const numStr = isTurnOn ? '1' : '0';

  lastManualCommandTime = Date.now();
  lastManualTargetState = isTurnOn;

  if (globalClient && globalClient.isConnected()) {
    try {
      const msg1 = new Paho.Message(commandStr);
      msg1.destinationName = MQTT_CONFIG.controlTopic;
      globalClient.send(msg1);

      // Also publish numeric "1" or "0" immediately for 100% firmware tolerance
      setTimeout(() => {
        try {
          if (globalClient && globalClient.isConnected()) {
            const msg2 = new Paho.Message(numStr);
            msg2.destinationName = MQTT_CONFIG.controlTopic;
            globalClient.send(msg2);
          }
        } catch (err) {}
      }, 150);

      console.log(`[MQTT] Published relay commands to ${MQTT_CONFIG.controlTopic}: ${commandStr} / ${numStr}`);
      return true;
    } catch (e) {
      console.error('Error sending relay command:', e);
      return false;
    }
  }
  return false;
}
