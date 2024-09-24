/* Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License. */

import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/src/themes.js';
import '@spectrum-web-components/theme/src/express/themes.js';
// components
import '@spectrum-web-components/banner/sp-banner.js';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/tooltip/sp-tooltip.js';
import '@spectrum-web-components/overlay/overlay-trigger.js';
import '@spectrum-web-components/overlay/sp-overlay.js';

import './style.css';

const { executeAsModal } = require("photoshop").core;
const { batchPlay } = require("photoshop").action;

const actions = {
    createVideoTimeline: [
        {
            _obj: "makeTimeline",
            _options: {
                dialogOptions: "dontDisplay"
            }
        }
    ],
    addVideoGroup: [
        {
            _obj: "make",
            _target: [
                {
                    _ref: "sceneSection"
                }
            ],
            name: "Video Group 1",
            _options: {
                dialogOptions: "dontDisplay"
            }
        }
    ]
};

const generateBatchPlay = (actionSequence) => async () => {
    await batchPlay(
        actionSequence,
        {}
    );

};

async function runModalFunction(action) {
    await executeAsModal(generateBatchPlay(action), {});
}

document.querySelector('#addVideoGroup').addEventListener('click', (e) => {
    runModalFunction(actions.addVideoGroup);
});

document.querySelector('#createVideoTimeline').addEventListener('click', (e) => {
    runModalFunction(actions.createVideoTimeline);
})



