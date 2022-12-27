import pubsub from 'pubsub-js'

class PubSub {
	constructor() {
		
	}
	
	publish(name, data) {
		return pubsub.publish(name, data)
	}
	
	publishSync(name, data) {
		return pubsub.publishSync(name, data)
	}
	
	subscribe(name, callback) {
		return pubsub.subscribe(name, callback)
	}
	
	unsubscribe(token) {
		return pubsub.unsubscribe(token)
	}
}

export default new PubSub()