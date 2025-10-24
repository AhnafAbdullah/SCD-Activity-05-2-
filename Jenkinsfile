pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    parameters {
        string(name: 'BRANCH_NAME', defaultValue: 'main')
        string(name: 'BUILD_ENV', defaultValue: 'dev')
        string(name: 'STUDENT_NAME', defaultValue: 'Ahnaf Abdullah') // put your name
    }

    environment {
        APP_VERSION = "1.0.0"
    }

    stages {
        stage('Install Dependencies') {
            steps {
                echo "Installing Node.js dependencies..."
                bat "npm install"
            }
        }

        stage('Build') {
            steps {
                echo "Building Calculator API v${APP_VERSION} on branch ${params.BRANCH_NAME}"
            }
        }

        stage('Unit Test') {
            when {
                expression { return params.BUILD_ENV == 'dev' }
            }
            steps {
                echo 'Running Jest tests for Calculator API...'
                bat "npm test"
            }
        }

        stage('Deploy') {
            steps {
                echo 'Simulating deployment of Calculator API...'
            }
        }
    }

    post {
        always {
            echo 'Cleaning up workspace...'
        }
        success {
            echo 'Pipeline executed successfully.'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
