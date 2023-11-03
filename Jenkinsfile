pipeline {
    agent any
    environment {
        SSH_CRED = credentials('web-server-key')
        def CONNECT = 'ssh -o StrictHostKeyChecking=no ubuntu@ec2-54-197-31-199.compute-1.amazonaws.com'
    }
    stages {

        stage('Pre-Build') {
            steps {
                echo 'install required packages'
                sh "npm install"
                sh "cp /home/ubuntu/.env .env"
                echo 'react packages installed'
            }
        }
        
        stage('Build') {
            steps {
                echo 'building static react app'
                sh "npm run build"
            }
        }

        stage('Package & Artifact App') {
            steps {
                echo 'building static react app'
                sh "cd build && zip -r webapp.zip ."
                sh "cd .."
                sh 'curl -v -u admin:password --upload-file build/webapp.zip http://100.26.111.206:8081/repository/web-artifacts/webapp.zip'
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Deploying to our nginx server'
                
                sshagent(['web-server-key']) {
                    sh '$CONNECT "sudo apt install zip -y"'
                    sh '$CONNECT "curl -O http://100.26.111.206:8081/repository/web-artifacts/webapp.zip"'

                    sh '$CONNECT "sudo rm -rf /var/www/html/"'
                    sh '$CONNECT "sudo mkdir /var/www/html/"'
                    
                    sh '$CONNECT "sudo unzip webapp.zip -d /var/www/html/"'
                    
                }
            }
        }


        stage('Clean-Up') {
            steps {
                echo 'Remove unwanted files'
                sh 'rm -R node_modules'
                sh "rm -R build"
            }
        }
    }
}