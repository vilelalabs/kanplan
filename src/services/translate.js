import enUS from "../../locales/en-US";
import ptBR from "../../locales/pt-BR";

export default function translate(key,locale){
    let t;
    switch (locale) {
        case 'en-US':
            t = enUS
            break;
        case 'pt-BR':
            t = ptBR
            break;
        default:
            t = enUS
            break;
    }
    return t[key]
}