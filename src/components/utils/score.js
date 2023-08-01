export const getScore = (score) => {
    return (score/2).toFixed(1)
}

export const getSeason = (season) => {
        switch (season) {
            case 'winter':
                return 'Зима';
            case 'spring':
                return 'Весна';
            case 'summer':
                return 'Лето';
            case 'fall':
                return 'Осень';
            default:
                return '';
        }
}

export const getWithoutLetters = (string) => {
    return string.replace(/\D/g, "");
}

export const getWithoutBracket = (string) => {
    return string.replace(/\[.*?\]/g, "");
}