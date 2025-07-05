def handler(event, context):
    # Your Lambda function logic goes here
    # Updated to test CDK pipeline deployment
    return {
        "statusCode": 200,
        "body": 'Hello from Lambda! Pipeline test successful!',
    }