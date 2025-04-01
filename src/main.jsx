import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import MyRoutes from "./routes/MyRoutes.jsx";
import { Provider } from "react-redux";
import myStore from "./store/Store.js";
import axios from "./axios/Instance.js";
import JSEncrypt from "jsencrypt";

const PUBLIC_KEY =
  "-----BEGIN PUBLIC KEY-----" +
  "MIIBITANBgkqhkiG9w0BAQEFAAOCAQ4AMIIBCQKCAQBR0b/Gx9cOu8q1m+Qu9GBv" +
  "+fkMmDuo6TmdtqBpxs0gCEzHrY6uiJqG7cRC4RY6te0z2/62EgpiwbotfFvrmtgE" +
  "SKIL6BncmMEtdZYE6bMmQywX8mx9DKiwJL7hcY5tgmPjyzpP4byurlQcqNWUG6DP" +
  "YptWJ7yU863cQyb+eyACPxvtqJn+geuGC+IyfPc6xiujpiauX4GBnv9V8ztcdv7b" +
  "eB4yxcyxw+6J8vsjI18fWhV0Cxn3WHliQk55Jw77VmL4OvpEjSctFpgJ+0dO645l" +
  "+lz05eQdKAUbnlNBMkELK2dzVRFXL1TvYdCIwon4fpszTuicuV3gczmP/vTtMGlL" +
  "AgMBAAE=" +
  "-----END PUBLIC KEY-----";
const PRIVATE_KEY =
  "-----BEGIN RSA PRIVATE KEY-----" +
  "MIIEoQIBAAKCAQBR0b/Gx9cOu8q1m+Qu9GBv+fkMmDuo6TmdtqBpxs0gCEzHrY6u" +
  "iJqG7cRC4RY6te0z2/62EgpiwbotfFvrmtgESKIL6BncmMEtdZYE6bMmQywX8mx9" +
  "DKiwJL7hcY5tgmPjyzpP4byurlQcqNWUG6DPYptWJ7yU863cQyb+eyACPxvtqJn+" +
  "geuGC+IyfPc6xiujpiauX4GBnv9V8ztcdv7beB4yxcyxw+6J8vsjI18fWhV0Cxn3" +
  "WHliQk55Jw77VmL4OvpEjSctFpgJ+0dO645l+lz05eQdKAUbnlNBMkELK2dzVRFX" +
  "L1TvYdCIwon4fpszTuicuV3gczmP/vTtMGlLAgMBAAECggEAG57fSs+zvfmPWPej" +
  "dGZzF9ofRS0vFrqFBMTeKlc+cA3dPZtNi4X6BIrHsnwh8Pfxd4xQ1E4Ky4PyweA1" +
  "d7fyLKAIdFSKRnoa3KnRVx89pzEN9ZeVIDHh0HTXK2wWVMmrxv6YVNczxxR6uKIW" +
  "V8Vr6Ba1scQAWZhZnP3ecBJIn/kkR/r6hHSTTzjwkz8t8exTeHpcwoMrruLWJbk2" +
  "cSQFB4+3xCXQNkxNS9L7ak/QoDrwG/RPGsH7LF5APeHTqLB2qtWG6B4wa+jRBIF8" +
  "9uv+t9wDqPS+k6d8klLl0dokLjhT4hY42TGFIZJKk3ATsj5miIRGJiEwfcioWYFq" +
  "xgoDwQKBgQCUwZRTIQNCB3PizBzGq3jy7eGCHvHzwFJu70SpEkiGkDFs4mItlNLf" +
  "h8wWpseHTo/O413hYP71qHRDFAo04ystur8jC8dRHKCMUkOFwu2WKHRH+hNVzg20" +
  "TF5OWjB9je+2Oqf3AxI8I4POaqFqPqDmkYjFIn4o/vTqYanAwyPoqQKBgQCMzlCy" +
  "ERzRt9hKDgV1R5SfXCPV+2khnEneGz7Wq9BBc6CteVUtNJZMnJmv5Drybb8GSecW" +
  "cKlVRnJ8jylUuCxThLal9LjHFxDDrvy/1F67VN2obmPw79NEJyaPm8t+nRIya4TB" +
  "SKdqIP3B/lj0Aazpo+q4Be0AZ+/SGFPEBeQ20wKBgAjZArN3ETSKMPBaZ5PBey4n" +
  "y/PrV0TCOaTzgkf0GHA4f1gUlvZTFb/J2e+298Mqfw81Is5W8JM388JRnNHMeTL9" +
  "GoVBHBfM9heihPWdxHfb7B6j1yaRXOtOZ4WNg7jUCl/yWS8t9ZWyHxLV8Mfa9cMB" +
  "APuIs6xIjdSq/mfCs44RAoGAaw4iRIDGTJ1fEU7/z1+RHGjNxk/Uav2NHBXS/Ry8" +
  "xkbHj52EqU4mSDF4mEcKmm/eoUVnMaSO2ospWJLwdb1h1k49IIikRJrA4EcXXDJ3" +
  "pC6uKPVlfzaYhmTN6LonSijaQQOGd/5pa0OSLADaWQs9EJbUSv4WaAyeRjrA1XU1" +
  "QokCgYA2GmqkNicYRUXC91icggUx6cYvpZ8RIo3uMnT7bPPUr347pi1RT7jrIwBz" +
  "1zUSY+3dikIsjH0fZcdhqFQ13AjJlmkqNEyQDt55c87RDmHbA6wLdyrc+IfuogvO" +
  "RW0+UPyotLPM+Vi0D7/MkvxSRsHET0Pkl3QZIoiYMuLJxDxEpg==" +
  "-----END RSA PRIVATE KEY-----";

axios.interceptors.response.use((response) => {
  if (
    response.config.url.startsWith("/userData") &&
    response.config.method === "get"
  ) {
    const decryptor = new JSEncrypt();
    decryptor.setPrivateKey(PRIVATE_KEY);
    response.data.map((userDetails) => {
      userDetails.password = decryptor.decrypt(userDetails.password);
    });
  }
  return response;
});

axios.interceptors.request.use((request) => {
  if (request.url.startsWith("/userData") && request.method === "post") {
    const encryptor = new JSEncrypt();
    encryptor.setPublicKey(PUBLIC_KEY);
    request.data.password = encryptor.encrypt(request.data.password);
  }
  return request;
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={myStore}>
      <RouterProvider router={MyRoutes}>
        <App />
      </RouterProvider>
    </Provider>
    ,
  </StrictMode>,
);
