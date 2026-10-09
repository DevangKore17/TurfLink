pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm ci || npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'npm run test' 
            }
        }
        stage('Docker Build') {
            steps {
                sh 'docker build -t turflink-app .'
            }
        }
        stage('Docker Deploy') {
            steps {
                // Assuming docker-compose is installed on the Jenkins node or we just restart the specific container
                // Since Jenkins is running in Docker-in-Docker via docker-compose, this might be tricky without docker-compose inside the Jenkins image.
                // We will just do a standard docker run if docker-compose isn't available, or rely on the host's orchestration.
                // For this example, we build the image so docker-compose on the host can pick it up.
                sh 'echo "Docker image turflink-app built successfully. You can restart the container to apply changes."'
            }
        }
    }
    post {
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed. Please check the logs.'
        }
    }
}
