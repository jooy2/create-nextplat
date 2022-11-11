#!/usr/bin/env node
import { spawn } from 'child_process';
import { existsSync, rmSync, statSync } from 'fs';
import { join } from 'path';
import pkg from './package.json' assert { type: 'json' };

const packageName = pkg.name.replace('create-', '');

async function run() {
	const clone = async () =>
		new Promise((resolve, reject) => {
			try {
				spawn(
					'git',
					[
						'clone',
						`https://github.com/${pkg.repository.url.split('/').at(-2)}/${packageName}`,
						packageName,
						'--depth',
						'1'
					],
					{ stdio: 'inherit' }
				)
					.on('error', (err) => {
						reject(err);
					})
					.on('exit', (code) => {
						resolve(code);
					});
			} catch (e) {
				reject(e);
			}
		});

	const installModules = async () =>
		new Promise((resolve, reject) => {
			try {
				const npmCommand = /^win/.test(process.platform) ? 'npm.cmd' : 'npm';
				spawn(npmCommand, ['install'], { stdio: 'inherit', cwd: join(process.cwd(), packageName) })
					.on('error', (err) => {
						reject(err);
					})
					.on('exit', (code) => {
						resolve(code);
					});
			} catch (e) {
				reject(e);
			}
		});

	try {
		if (existsSync(packageName) && statSync(packageName).isDirectory()) {
			console.error(`Failed: Directory "${packageName}" already exists.`);
			process.exit(1);
			return;
		}

		await clone();

		// Remove .git, docs directory
		rmSync(join(process.cwd(), packageName, '.git'), { recursive: true, force: true });

		await installModules();
	} catch (e) {
		console.error(e?.message);
		process.exit(1);
	}
}

run();
