/**
 * Configuration file for semantic-release.
 * @module release.config
 */

module.exports = {
	branches: ['main'],
	plugins: [
		'@semantic-release/commit-analyzer',
		[
			'@semantic-release/release-notes-generator',
			{
				preset: 'conventionalcommits',
				presetConfig: {
					issuePrefixes: ['DD-', 'DIAG-', 'DPN-'],
					issueUrlFormat:
						'https://comprend.atlassian.net/browse/{{prefix}}{{id}}',
				},
			},
		],
		'@semantic-release/changelog',
		[
			'@semantic-release/npm',
			{
				npmPublish: false,
			},
		],
		[
			'@semantic-release/git',
			{
				message:
					// eslint-disable-next-line no-template-curly-in-string
					'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
			},
		],
	],
}
