document.addEventListener('DOMContentLoaded', () => {
    const $form = document.querySelector('#weatherForm')
    const $city = document.querySelector('#city')
    const $firstMessage = document.querySelector('#message-1')
    const $secondMessage = document.querySelector('#message-2')

    $form.addEventListener('submit', (e) => {
        e.preventDefault()

        $firstMessage.textContent = 'Loading...'
        $secondMessage.textContent = ''

        const url = `/weather?address=${$city.value}`

        fetch(url).then((res) => {
            res.json().then(data => {
                if (data.error) {
                    $firstMessage.textContent = data.error
                    return console.error(data.error)
                }

                $firstMessage.textContent = data.location
                $secondMessage.textContent = data.forecast
            })
        })
    })
})
