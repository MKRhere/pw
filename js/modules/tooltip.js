'use strict'

// Toggle tooltips

const __ = document.querySelector.bind(document)

function toggle(obj) {
	const e = __(obj)
	e.style.display =
		(e.style.display === 'inline-block')
			? 'none' : 'inline-block'
}

function toggleOn(obj) {
	__(obj).style.display = 'inline-block'
}

function toggleOff(obj) {
	__(obj).style.display = 'none'
}

const addListener = (element, events, handler) =>
	(Array.isArray(events)
		? events
		: [events]).forEach(event =>
			element.addEventListener(event, handler))

const addToolTip = selector => {
	let tipselector = '#' + selector + '-select'
	let tipcontent = '#' + selector + '-tip'

	addListener(
		__(tipselector),
		['mouseover', 'mouseout'],
		() => toggle(tipcontent))

	addListener(
		__(tipselector),
		'touchstart',
		() => addListener(
			__(tipselector),
			'touchend',
			toggle(tipcontent)))

	addListener(
		__('body'),
		'touchstart',
		(e) => { if (e.target !== __(tipcontent)) toggleOff(tipcontent) }
	)
}

//export default addToolTip
module.exports = addToolTip