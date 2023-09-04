import moment from 'moment';
export const formatDate = (date) => {
	const now = new Date();
	const diff = now.getTime() - date.getTime();

	//Current time is less than 1min find this condition
	if (diff < 60000) {
		return 'Just now';
	}

	//Current time is less than 1hour find this condition
	if (diff < 3600000) {
		return `${Math.round(diff / 60000)}min ago`;
	}

	//Current time is less than 1day find this condition
	if (diff < 86400000) {
		return moment(date).format('h:mm A');
	}

	//else more than one day ago display formated date accordingly
	return moment(date).format('MM/DD/YY');
};

// this code takes a text message as input, finds all Unicode emojis in the text, and wraps each emoji in a span element with specific inline CSS styles to control its appearance. This can be useful for styling and formatting emojis within text messages on a web page or in a similar context.  Shows in message.jsx
export const wrapEmojisInHtmlTag = (messageText) => {
	const regexEmoji = /(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)/gu; // regex to match all Unicode emojis
	return messageText.replace(regexEmoji, (match) => {
		return `<span style="font-size:1.5em;margin:0 2px;position:relative;top:2px">${match}</span>`;
	});
};
