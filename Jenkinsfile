pipeline {
    agent any

    parameters {
        choice(
            name: 'TAG',
            choices: ['@Regression', '@Web', '@API'],
            description: 'Select test suite'
        )
    }

    stages {

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Install Browsers') {
            steps {
                sh 'npx playwright install chromium'
            }
        }

        stage('Run Tests') {
            steps {
                sh "npx playwright test --grep ${params.TAG}"
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