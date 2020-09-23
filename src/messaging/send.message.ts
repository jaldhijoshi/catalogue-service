import AWS from 'aws-sdk';

export class SendSQSMessage{

    // Create an SQS service object
    sqs : any;
    queueUrl : any;

    constructor(){
        AWS.config.loadFromPath('./dist/config/aws.config.json');
        this.sqs = new AWS.SQS({apiVersion: '2012-11-05',region : 'ap-south-1'});
        this.queueUrl = "https://sqs.ap-south-1.amazonaws.com/714837985838/firstQueue.fifo";
        
    }

    sendMessage(messageData : any) : Promise<any>{
        return this.sqs.sendMessage(messageData).promise();
    }

}


