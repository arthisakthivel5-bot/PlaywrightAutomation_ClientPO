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
                    def urls = [
                        client: "https://rahulshettyacademy.com",
                        eventhub: "https://eventhub.rahulshettyacademy.com"
                    ]

                    def selectedUrl = urls[params.ENV]

                    sh """
                    BASE_URL=${selectedUrl} \
                    npx playwright test --project=chromium --grep "${params.TAG}"
                    """
                }
            }
        }
    }

    post {
        always {
            publishHTML([
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])
        }
    }
}