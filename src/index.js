#!/usr/bin/env node
'use es6';

import CommandLineClient from './cli/CommandLineClient';

const commandLineClient = new CommandLineClient();
commandLineClient.run();
