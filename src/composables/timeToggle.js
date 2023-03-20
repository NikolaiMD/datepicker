import {ref} from "vue";

export default function timeToggle() {
    let labelTime = ref('Show')
    const timePanelToggle = () => {
        labelTime.value === 'Show' ? labelTime.value = 'Hide' : labelTime.value = 'Show'
    }
    return {
        labelTime,
        timePanelToggle
    }
}
