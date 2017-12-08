'use strict'

// Toggle tooltips

const __ = document.querySelector.bind(document)

function toggle(obj) {
	const e = __(obj)
	e.style.display =
		(e.style.display === 'inline-block')
			? 'none' : 'inline-block'
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
	addListener(
		__('#' + selector + '-click'),
		['click', 'mouseover', 'mouseout'],
		() => toggle('#' + selector + '-tip'))

	addListener(
		__('body'),
		'click',
		(e) => { if (e.target !== __('#' + selector + '-tip')) toggleOff('#' + selector + '-tip') }
	)}

//export default addToolTip
module.exports = addToolTip