import React from "react";
import { renderToPipeableStream } from "react-dom/server";
import { Writable } from "node:stream";
import App from "./App";
import { ModalsProvider } from "@/contexts/ModalsContext";
import { AppModals } from "@/components/AppModals";

// Rendu statique au build : attend toutes les sections lazy (onAllReady)
// pour que le HTML livré contienne tout le contenu, lisible sans JavaScript.
export function render(): Promise<string> {
  return new Promise((resolve, reject) => {
    let html = "";
    const sink = new Writable({
      write(chunk, _encoding, callback) {
        html += chunk.toString();
        callback();
      },
      final(callback) {
        resolve(html);
        callback();
      },
    });

    const { pipe } = renderToPipeableStream(
      <React.StrictMode>
        <ModalsProvider>
          <App />
          <AppModals />
        </ModalsProvider>
      </React.StrictMode>,
      {
        onAllReady() {
          pipe(sink);
        },
        onShellError: reject,
        onError: reject,
      }
    );
  });
}
