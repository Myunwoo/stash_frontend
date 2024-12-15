pipeline {
    agent any
    environment {
        AWS_REGION = 'ap-northeast-2'
        REPO_URL = 'https://github.com/Myunwoo/stash_frontend.git'
        BRANCH_NAME = 'main'
        EC2_TARGET = 'ubuntu@172.31.9.52'
    }
    stages {
        stage('Checkout Source') {
            steps {
                echo 'Checking out source code...'
                git branch: "${BRANCH_NAME}", url: "${REPO_URL}"
            }
        }
        stage('Generate API Client') {
            steps {
                echo 'Generating OpenAPI client...'
                sh '''
                pnpm install
                pnpm run oag:gen:temp
                '''
            }
        }
        stage('Build Nuxt3') {
            steps {
                echo 'Building Nuxt3...'
                sh '''
                pnpm run build
                '''
            }
        }
        stage('Deploy to EC2') {
            steps {
                echo 'Deploying to EC2...'
                withCredentials([sshUserPrivateKey(credentialsId: 'frontend-deploy-ssh-key', keyFileVariable: 'SSH_KEY')]) {
                    sh '''
                    echo "Testing SSH connection to EC2..."
                    ssh -o StrictHostKeyChecking=no -i $SSH_KEY ${EC2_TARGET} "echo connected"
                    
                    echo "Clearing previous deployment files..."
                    ssh -o StrictHostKeyChecking=no -i $SSH_KEY ${EC2_TARGET} "rm -rf /home/ubuntu/nuxt-app/*"
                    
                    echo "Transferring build files..."
                    scp -o StrictHostKeyChecking=no -i $SSH_KEY -r .output/* ${EC2_TARGET}:/home/ubuntu/nuxt-app

                    
                    echo "Restarting Nuxt application..."
                    ssh -o StrictHostKeyChecking=no -i $SSH_KEY ${EC2_TARGET} "cd /home/ubuntu/nuxt-app/server && pm2 stop nuxt-app || true && pm2 start index.mjs --name nuxt-app"

                    echo "Check pm2 list"
                    ssh -o StrictHostKeyChecking=no -i $SSH_KEY ${EC2_TARGET} "pm2 list"

                    echo "Check pm2 log"
                    ssh -o StrictHostKeyChecking=no -i $SSH_KEY ${EC2_TARGET} "pm2 logs nuxt-app"
                    '''
                }
            }
        }
    }
    post {
        success {
            echo 'Pipeline completed successfully.'
        }
        failure {
            echo 'Pipeline failed. Please check the logs for more details.'
        }
    }
}