import {ref} from "vue";

export default function templateToggle() {
    let labelTemplate = ref('Show')

    const templatePanelToggle = () => {
        labelTemplate.value === 'Show' ? labelTemplate.value = 'Hide' : labelTemplate.value = 'Show'
    }
    return {
        labelTemplate,
        templatePanelToggle
    }
}
