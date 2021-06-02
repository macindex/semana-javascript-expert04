import Atendee from "./atendee.js"

export default class Room {
    constructor ({ id, topic, atendeesCount, speakersCount, featuredAtendees, owner, users }) {
        this.id = id
        this.topic = topic
        this.atendeesCount = atendeesCount
        this.speakersCount = speakersCount
        this.featuredAtendees = featuredAtendees?.map(atendee = new Atendee(atendee))
        this.owner = new Atendee(owner)
        this.users = users

    }
}


