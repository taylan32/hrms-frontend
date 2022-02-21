import React from 'react';
import { Icon } from 'semantic-ui-react';

export default function LanguageLevelIcon({ level }) {

    let name1 = "circle outline", name2 = "circle outline", name3 = "circle outline", name4 = "circle outline", name5 = "circle outline"

    if (level === 1) {
        name1 = "circle";
    }

    if (level === 2) {
        name1 = name2 = "circle";
    }

    if (level === 3) {
        name1 = name2 = name3 = "circle";
    }

    if (level === 4) {
        name1 = name2 = name3 = name4 = "circle";
    }

    if (level === 5) {
        name1 = name2 = name3 = name4 = name5 = "circle";
    }

    return (
        <span>
            <Icon size='small' color='blue' name={name1} />
            <Icon size='small' color='blue' name={name2} />
            <Icon size='small' color='blue' name={name3} />
            <Icon size='small' color='blue' name={name4} />
            <Icon size='small' color='blue' name={name5} />
        </span>
    );
}
