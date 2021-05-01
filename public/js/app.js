document.addEventListener('DOMContentLoaded', () => {
    const $form = document.querySelector('#weatherForm')
    const $city = document.querySelector('#city')

    $form.addEventListener('submit', (e) => {
        e.preventDefault()

        const city = $city.value

        const url = `/weather?address=${city}`

        fetch(url).then((res) => {
            res.json().then(data => {
                if (data.error) {
                    return console.error(data.error)
                }

                console.log(data)
            })
        })
    })
})
