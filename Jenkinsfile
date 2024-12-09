pipeline {
    agent any
    environment {
        AWS_REGION = 'ap-northeast-2'
        S3_BUCKET = 'stash-frontend-app'
    }
    stages {
        stage('Build Nuxt3') {
            steps {
                sh '''
                pnpm install
                pnpm run oag gen
                pnpm run build
                '''
            }
        }
        stage('Deploy to S3') {
            steps {
                withAWS(credentials: 'aws-credentials', region: "${AWS_REGION}") {
                    sh 'aws s3 sync ./dist s3://${S3_BUCKET} --delete'
                }
            }
        }
    }
}



// pipeline {
//     agent any
//     environment {
//         AWS_CREDENTIALS_ID = 'aws-credentials'
//         NODEJS_HOME = tool name: 'NodeJS', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
//         GRADLE_HOME = tool name: 'Gradle', type: 'hudson.plugins.gradle.GradleInstallation'
//         AWS_REGION = 'ap-northeast-2'
//     }
//     stages {
//         stage('Checkout') {
//             steps {
//                 git branch: 'main', url: 'https://github.com/<username>/<repo>'
//             }
//         }
//         stage('Build Nuxt3') {
//             steps {
//                 dir('frontend') {
//                     withEnv(["PATH+NODE=$NODEJS_HOME/bin"]) {
//                         sh '''
//                         pnpm install
//                         pnpm run oag gen
//                         pnpm run build
//                         '''
//                     }
//                 }
//             }
//         }
//         stage('Deploy Nuxt3') {
//             steps {
//                 dir('frontend') {
//                     sh '''
//                     aws s3 sync ./dist s3://your-nuxt3-bucket/ --delete
//                     '''
//                 }
//             }
//         }
//         // stage('Deploy Nuxt3') {
//         //     steps {
//         //         dir('frontend') {
//         //             sh '''
//         //             aws s3 sync ./dist s3://your-nuxt3-bucket/ --delete
//         //             aws cloudfront create-invalidation --distribution-id YOUR_CLOUDFRONT_ID --paths "/*"
//         //             '''
//         //         }
//         //     }
//         // }
//         // stage('Build Spring Boot') {
//         //     steps {
//         //         dir('backend') {
//         //             withEnv(["PATH+GRADLE=$GRADLE_HOME/bin"]) {
//         //                 sh './gradlew build'
//         //             }
//         //         }
//         //     }
//         // }
//         // stage('Deploy Spring Boot') {
//         //     steps {
//         //         dir('backend') {
//         //             sh '''
//         //             scp build/libs/*.jar ec2-user@<EC2-INSTANCE>:/home/ec2-user/app.jar
//         //             ssh ec2-user@<EC2-INSTANCE> "sudo systemctl restart your-spring-boot-app"
//         //             '''
//         //         }
//         //     }
//         // }
//     }
//     post {
//         success {
//             echo 'Deployment completed successfully.'
//         }
//         failure {
//             echo 'Deployment failed. Please check the logs.'
//         }
//     }
// }
