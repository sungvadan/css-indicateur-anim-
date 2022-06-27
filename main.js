const menu = document.querySelector('.menu')
const menuItems = Array.from(document.querySelectorAll('.menu a'))
let activeItem = menu.querySelector('[aria-selected]')

menuItems.forEach(item => {
    const span = document.createElement('span')
    span.classList.add('indicator')
    item.appendChild(span)
})

/**
 * 
 * @param {HTMLElement} fromElement 
 * @param {HTMLElement} toElement
 * @return {string}
 */
function getTransform(fromElement, toElement) {
    const formRect = fromElement.getBoundingClientRect()
    const toRect = toElement.getBoundingClientRect()
    const transform = {
        x: formRect.x - toRect.x,
        y: formRect.y - toRect.y,
        scaleX: formRect.width / toRect.width,
        scaleY: formRect.height / toRect.height,
    }

    return `translate3d(${transform.x}px, ${transform.y}px, 0) scale(${transform.scaleX}, ${transform.scaleY})`
}


/**
 * 
 * @param {{currentTarget: HTMLElement}} e 
 */
 function onItemClick(e) {
    if (e.currentTarget == activeItem) {
        return
    }

    activeItem?.removeAttribute('aria-selected')
    e.currentTarget.setAttribute('aria-selected', true)
  
    if (activeItem) {
        const prevIndicator = activeItem.querySelector('.indicator')
        const currentIndicator = e.currentTarget.querySelector('.indicator')

        currentIndicator.animate([
            {transform: getTransform(prevIndicator, currentIndicator)},
            {transform: 'translate3d(0,0,0) scale(1,1)'}
        ], {
            fill: 'none',
            duration: 600,
            easing: 'cubic-bezier(.77,1.94,.19,.67)'
        })
    }

    activeItem = e.currentTarget
}


menuItems.forEach(item => {
    item.addEventListener('click', onItemClick)
})