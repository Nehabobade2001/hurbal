
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port:6065,
    allowedHosts:['uniquedirectselling.smartchainstudio.in','https://uniquedirectselling.smartchainstudio.in','www.uniquedirectselling.smartchainstudio.in','https://www.uniquedirectselling.smartchainstudio.in','uniquedirectselling.in','https://uniquedirectselling.in','www.uniquedirectselling.in','https://www.uniquedirectselling.in']
  },
  preview:{
    port:6065,
    allowedHosts:['uniquedirectselling.smartchainstudio.in','https://uniquedirectselling.smartchainstudio.in','www.uniquedirectselling.smartchainstudio.in','https://www.uniquedirectselling.smartchainstudio.in','uniquedirectselling.in','https://uniquedirectselling.in','www.uniquedirectselling.in','https://www.uniquedirectselling.in']
  }
})