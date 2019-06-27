import React from 'react';

import { delay } from 'redux-saga'
import { call, put } from 'redux-saga/effects'

import { AppActions } from "../reducers/app";

const MAX_RETRIES = 3;

export function autoRestart(generator) {
    return function* autoRestarting(...args) {
        let count = 0;
        let recovered = false;

        function* recoverCallback() {
            recovered = true;
            yield null;
        }

        while (!recovered) {
            try {
                yield call(generator, ...args, recoverCallback);
                break;
            } catch (e) {
                if (count === MAX_RETRIES) {
                  console.log(e)
                    console.log("알수 없는 오류가 발생했습니다. 아래 메세지를 복사해서 개발자한테 알려주세요."+ Buffer.from(JSON.stringify(e)).toString("base64"))
                    break;
                }

                count += 1;
            }
        }

        yield recoverCallback();
    }
}
