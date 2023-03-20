import {onMounted, ref} from "vue";

export default function themeSwitch() {
    let mode = ref(null)
    let switched = ref(null)
    const body = document.body

    const modeToggle = () => {
        if (mode.value === 'light') {
            mode.value = 'dark'
            body.classList.add('dark')
            body.classList.remove('light')
        } else {
            mode.value = 'light'
            body.classList.remove('dark')
            body.classList.add('light')
        }
        localStorage.setItem("mode", mode.value);
    }

    onMounted(() => {
        if (localStorage.getItem('mode') && localStorage.getItem('mode') !== 'light') {
            mode.value = localStorage.getItem('mode')
            switched.value = true
            body.classList.add(`${mode.value}`)
        } else {
            mode.value = 'light'
            switched.value = false
            body.classList.add('light')
        }
    })
    return {
        mode,
        switched,
        modeToggle
    }
}
