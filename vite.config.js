import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

import http from 'http';

function clipClassifierPlugin() {
  return {
    name: 'clip-classifier-api',
    configureServer(server) {
      server.middlewares.use('/api/classify', (req, res) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              res.setHeader('Content-Type', 'application/json');

              // 1. Try fastest path: query the in-memory CLIP daemon on port 5001
              const forwardReq = http.request(
                {
                  hostname: '127.0.0.1',
                  port: 5001,
                  path: '/classify',
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(body),
                  },
                  timeout: 10000,
                },
                forwardRes => {
                  let resData = '';
                  forwardRes.on('data', chunk => { resData += chunk; });
                  forwardRes.on('end', () => {
                    try {
                      const parsed = JSON.parse(resData);
                      res.statusCode = 200;
                      res.end(JSON.stringify(parsed));
                    } catch (e) {
                      fallbackCli();
                    }
                  });
                }
              );

              forwardReq.on('error', () => {
                fallbackCli();
              });

              forwardReq.on('timeout', () => {
                forwardReq.destroy();
                fallbackCli();
              });

              forwardReq.write(body);
              forwardReq.end();

              // Fallback if daemon is not running: execute CLI with 40s timeout
              function fallbackCli() {
                const data = JSON.parse(body || '{}');
                let base64Image = data.image || '';
                if (base64Image.includes(',')) {
                  base64Image = base64Image.split(',')[1];
                }

                const tempPath = path.resolve('temp_classify.jpg');
                if (base64Image) {
                  fs.writeFileSync(tempPath, Buffer.from(base64Image, 'base64'));
                }

                exec(`python3 classify.py "${tempPath}" --json`, { timeout: 40000 }, (error, stdout) => {
                  if (!error && stdout) {
                    try {
                      const parsed = JSON.parse(stdout);
                      res.statusCode = 200;
                      res.end(JSON.stringify(parsed));
                      return;
                    } catch (e) {}
                  }
                  res.statusCode = 500;
                  res.end(JSON.stringify({ success: false, error: error ? error.message : 'Execution failed' }));
                });
              }
            } catch (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: err.message }));
            }
          });
        } else {
          res.statusCode = 405;
          res.end();
        }
      });
    }
  };
}

function soilClassifierPlugin() {
  return {
    name: 'soil-classifier-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && (req.url.startsWith('/api/soil-classify') || req.url.startsWith('/api/soil-anomaly') || req.url.startsWith('/api/soil-batch'))) {
          if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', () => {
              res.setHeader('Content-Type', 'application/json');
              const forwardReq = http.request(
                {
                  hostname: '127.0.0.1',
                  port: 5002,
                  path: req.url,
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(body),
                  },
                  timeout: 8000,
                },
                forwardRes => {
                  let resData = '';
                  forwardRes.on('data', chunk => { resData += chunk; });
                  forwardRes.on('end', () => {
                    try {
                      const parsed = JSON.parse(resData);
                      res.statusCode = 200;
                      res.end(JSON.stringify(parsed));
                    } catch (e) {
                      res.statusCode = 200;
                      res.end(resData);
                    }
                  });
                }
              );

              forwardReq.on('error', () => {
                res.statusCode = 502;
                res.end(JSON.stringify({ success: false, error: 'PyTorch Soil API not reachable on port 5002' }));
              });

              forwardReq.on('timeout', () => {
                forwardReq.destroy();
                res.statusCode = 504;
                res.end(JSON.stringify({ success: false, error: 'Inference timed out' }));
              });

              forwardReq.write(body);
              forwardReq.end();
            });
            return;
          }
        }
        next();
      });
    }
  };
}

function pearlMilletClassifierPlugin() {
  return {
    name: 'pearl-millet-classifier-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && (req.url.startsWith('/predict') || req.url.startsWith('/demo') || req.url === '/status')) {
          const forwardReq = http.request(
            {
              hostname: '127.0.0.1',
              port: 8005,
              path: req.url,
              method: req.method,
              headers: req.headers,
              timeout: 15000,
            },
            forwardRes => {
              res.writeHead(forwardRes.statusCode, forwardRes.headers);
              forwardRes.pipe(res);
            }
          );

          forwardReq.on('error', () => {
            if (!res.headersSent) {
              res.statusCode = 502;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: 'Pearl Millet Dual AI API not reachable on port 8005' }));
            }
          });

          forwardReq.on('timeout', () => {
            forwardReq.destroy();
            if (!res.headersSent) {
              res.statusCode = 504;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: 'Inference timed out' }));
            }
          });

          req.pipe(forwardReq);
          return;
        }
        next();
      });
    }
  };
}

function diseaseClassifierPlugin() {
  return {
    name: 'disease-classifier-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.startsWith('/api/disease-classify')) {
          if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', () => {
              res.setHeader('Content-Type', 'application/json');
              const forwardReq = http.request(
                {
                  hostname: '127.0.0.1',
                  port: 5004,
                  path: req.url,
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(body),
                  },
                  timeout: 15000,
                },
                forwardRes => {
                  let resData = '';
                  forwardRes.on('data', chunk => { resData += chunk; });
                  forwardRes.on('end', () => {
                    try {
                      const parsed = JSON.parse(resData);
                      res.statusCode = 200;
                      res.end(JSON.stringify(parsed));
                    } catch (e) {
                      res.statusCode = 200;
                      res.end(resData);
                    }
                  });
                }
              );

              forwardReq.on('error', () => {
                res.statusCode = 502;
                res.end(JSON.stringify({ success: false, error: 'Disease Detection API not reachable on port 5004' }));
              });

              forwardReq.on('timeout', () => {
                forwardReq.destroy();
                res.statusCode = 504;
                res.end(JSON.stringify({ success: false, error: 'Disease inference timed out' }));
              });

              forwardReq.write(body);
              forwardReq.end();
            });
            return;
          }
        }
        next();
      });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), clipClassifierPlugin(), soilClassifierPlugin(), pearlMilletClassifierPlugin(), diseaseClassifierPlugin()],
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/api/blockchain': {
        target: 'http://127.0.0.1:5003',
        changeOrigin: true
      },
      '/api/prediction': {
        target: 'http://127.0.0.1:5003',
        changeOrigin: true
      }
    }
  },
});
