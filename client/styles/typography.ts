import styled from "styled-components";

import { colours } from "./colours";
import { device } from "./device";

// font size
const text48 = "48px";
const text36 = "36px";
const text32 = "32px";
const text30 = "30px";
const text24 = "24px";
const text20 = "20px";
const text18 = "18px";
const text16 = "16px";
const text14 = "14px";
const text12 = "12px";
const text10 = "10px";

// font weight
const weight900 = "900";
const weight700 = "700";
const weight600 = "600";
const weight400 = "400";

// font weight
const fontBrandonGrotesque = "Brandon Grotesque";
const fontInter = "Inter";

export const desktopFontSize = Object.freeze({
    h1: text48,
    h2: text32,
    h3: text24,
    subtitle1: text20,
    subtitle2: text18,
    body1: text16,
    body2: text12,
});

export const mobileFontSize = Object.freeze({
    h1: text30,
    h2: text24,
    h3: text20,
    subtitle1: text18,
    subtitle2: text16,
    body1: text14,
    body2: text12,
    body3: text10,
});

export const fontWeight = Object.freeze({
    bold: weight700,
    semiBold: weight600,
    regular: weight400,
});

export const fontFamily = Object.freeze({
    primary: fontInter,
    secondary: fontBrandonGrotesque,
});

export const Waterpark = styled.span`
    font-family: ${fontFamily.secondary};
    font-style: normal;
    font-weight: ${weight900};
    font-size: ${text36};
    line-height: 120%;
    color: ${colours.black};
    @media ${device.laptop} {
        font-size: ${text30};
    }
`;

export const PageTitle = styled.span`
    font-family: ${fontFamily.primary};
    font-style: normal;
    font-weight: ${fontWeight.semiBold};
    font-size: ${desktopFontSize.h1};
    line-height: 120%;
    color: ${colours.black};
    @media ${device.laptop} {
        font-size: ${mobileFontSize.h1};
    }
`;
