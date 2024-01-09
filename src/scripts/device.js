import { Device } from '@capacitor/device'

export const infoDevice = {
    methods: {
        async platform() {
            const info = await Device.getInfo()

            return info.platform == "web" ? true : false
        }
    }
}