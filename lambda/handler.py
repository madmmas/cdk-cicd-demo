def handler(event, context):
    # Your Lambda function logic goes here
    return {
        "statusCode": 200,
        "body": 'Hello from Lambda!',
    }