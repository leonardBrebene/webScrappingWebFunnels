import { CookieJar, JSDOM as jsdom } from "jsdom";
import fs from "fs";
import request from 'request-promise';

let isProcessing = false;
async function fetchData() {
    // Simulate an asynchronous operation, like fetching data
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('Mock Data');
      }, 1000); // Simulating a 1000ms delay
    });
  }
  
  async function intervalFunction() {
    if (!isProcessing) {
      isProcessing = true;
  
      try {
        const data = await fetchData();
        console.log(`Data: ${data}`);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        isProcessing = false;
      }
    }
  }
  
  setInterval(intervalFunction, 2000);
  console.log("ceva")