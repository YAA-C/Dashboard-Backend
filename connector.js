import * as amqp from "amqplib";

let instance = null;

class RabbitMQConnector {
    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }

    async connectRabbit() {
        try {
            this.connection = await amqp.connect("amqp://localhost");        
        }
        catch (err) {
            console.log("Problem creating connection to RabbitMq");
            throw err;
        }
        
        try {
            this.confirmChannel = await this.connection.createConfirmChannel();
        }
        catch (err) {
            console.log("Problem creating channel");
            throw err;
        }

        await this.confirmChannel.assertExchange("work_exchange", "fanout", {durable: false});
        await this.confirmChannel.assertQueue("to_charter", {durable: false});
        await this.confirmChannel.assertQueue("to_model", {durable: false});
        await this.confirmChannel.bindQueue("to_charter", "work_exchange");
        await this.confirmChannel.bindQueue("to_model", "work_exchange");
    }
    

    async sendData(data) {
        this.confirmChannel.publish("work_exchange", "", Buffer.from(JSON.stringify(data)), {persistent: false}, () => {
            console.log("Job pushed to Queue.")
        });
    }
}

new RabbitMQConnector();

export default instance;