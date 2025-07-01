pipeline {
    agent any

    environment {
        AWS_REGION = 'ap-south-1'
        IMAGE_NAME = 'todo-frontend'
        ECR_REGISTRY = "476287788215.dkr.ecr.${AWS_REGION}.amazonaws.com"
        ECR_REPO = "${ECR_REGISTRY}/${IMAGE_NAME}"
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out frontend code...'
                git branch: 'release-dev', url: 'https://github.com/aws-devops-2-0/todo-frontend.git'
            }
        }

        stage('Install & Build Angular App') {
            steps {
                echo 'Installing and building Angular app...'
                sh '''
                    npm install
                    npm run build --configuration=production
                '''
            }
        }

        stage('Docker Build & Push') {
            steps {
                echo 'Building and pushing Docker image...'
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-creds']]) {
                    sh '''
                        aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_REGISTRY
                        docker build -t $IMAGE_NAME:latest .
                        docker tag $IMAGE_NAME:latest $ECR_REPO:latest
                        docker push $ECR_REPO:latest
                    '''
                }
            }
        }
    }
}
