pipeline {
    agent any

    parameters {
        choice(
            name: 'TAG',
            choices: ['@Regression', '@Web', '@API'],
            description: 'Select test suite'
        )
        choice(
            name: 'ENV',
            choices: ['client', 'eventhub'],
            description: 'Select Environment'
        )
        choice(
            name: 'USER',
            choices: ['user1', 'user2'],
            description: 'Select User'
        )
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Install Chromium') {
            steps {
                sh 'npx playwright install chromium'
            }
        }

        stage('Run Tests') {
            steps {
                script {

                    // URL mapping
                    def urls = [
                        client: "https://rahulshettyacademy.com",
                        eventhub: "https://eventhub.rahulshettyacademy.com"
                    ]
                    def selectedUrl = urls[params.ENV]

                    // Credentials mapping
                    def credsId = params.USER == 'user1' ? 'user1-login' : 'user2-login'

                    withCredentials([usernamePassword(
                        credentialsId: credsId,
                        usernameVariable: 'USERNAME',
                        passwordVariable: 'PASSWORD'
                    )]) {

                        sh """
                        BASE_URL=${selectedUrl} \
                        USERNAME=${USERNAME} \
                        PASSWORD=${PASSWORD} \
                        npx playwright test --project=chromium --grep "${params.TAG}"
                        """
                    }
                }
            }
        }
    }

    post {
    always {

        // Playwright HTML Report
        publishHTML(target: [
            allowMissing: true,
            alwaysLinkToLastBuild: true,
            keepAll: true,
            reportDir: 'playwright-report',
            reportFiles: 'index.html',
            reportName: 'Playwright Report'
        ])

        // Allure Report
        allure([
            includeProperties: false,
            results: [[path: 'allure-results']],
            commandline: 'allure'   // 👈 THIS LINE IS IMPORTANT
            ])
    }
    
    }
}
