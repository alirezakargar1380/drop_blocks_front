class PersianNumUtil {
    static toPersianNum(value) {
        if (!value) {
            return;
        }

        let persianNumbers = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۰"]
        let englishNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]

        for (let i = 0, numbersLen = englishNumbers.length; i < numbersLen; i++) {
            value = value.replace(new RegExp(englishNumbers[i], "g"), persianNumbers[i]);
        }

        return value
    }
}

