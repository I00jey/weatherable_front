# Weatherable

<br>
<br>

<p align="center">
  <img src="https://github.com/dydgjs200/Weatherable_front/assets/121750853/34d54f16-066e-4551-a762-69dac06b41ff" width="400" height="300"/>
</p>

<br>
<br>

> An online personal wardrobe platform utilizing AI.

> 개발기간 : 24.03.02 ~ 24.04.01

<br>

## 팀 소개

| 이름   | 담당      | Git              |
| ------ | --------- | ---------------- |
| 김재현 | Front-End | @kimjaehyeon0527 |
| 최 진  | Front-End | @nwejin          |
| 윤정훈 | Front-End | @wjdgns4070      |
| 최용헌 | Back-End  | @dydgjs200       |
| 최예지 | Back-End  | @I00jey          |
| 선지훈 | Back-End  | @JHSasdf         |

<br>
<br>

## 프로젝트 소개

**This project is an online personal wardrobe platform utilizing AI.**

Through this platform, users can easily and conveniently manage their clothes and even try out outfit combinations without physically trying them on.
Additionally, they can receive AI recommendations for outfits suitable for the weather.
This platform offers users the convenience of daily life with a touch of style.

**Our platform offers the following features.**

- AI-based outfit recommendation tailored to the weather conditions.
- Automatic style suggestions by AI upon registering clothing items.
- Wardrobe management functionality.
- Self-recorded outfit coordination feature for users to track their styling choices.

<br>
<br>

## 시작가이드

### Front-End

```c
$ git clone https://github.com/I00jey/weatherable_front
$ cd Weatherable_front
$ npm install
$ npm run build
$ npm start
```

<br>

### Back-End (Java-Spring)

Reference : [Weatherable-Spring](https://github.com/I00jey/weatherable_back)

<br>

### Back-End (Python)

Reference : [Weatherable-Python](https://github.com/I00jey/weatherable_python)

<br>
<br>

## 기술 스택

#### Environment

<img src="https://img.shields.io/badge/Visualstudiocode-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white"/> <img src="https://img.shields.io/badge/git-222831?style=for-the-badge&logo=git&logoColor=white"/>
<br>

#### Communication

<img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white"/> <img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white"/>
<br>

#### Front Development

<img src="https://img.shields.io/badge/nextdotjs-35374B?style=for-the-badge&logo=nextdotjs&logoColor=white"/> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white"/> <img src="https://img.shields.io/badge/tsnode-3178C6?style=for-the-badge&logo=tsnode&logoColor=white"/> <img src="https://img.shields.io/badge/sass-CC6699?style=for-the-badge&logo=sass&logoColor=white"/> <img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white"/> <img src="https://img.shields.io/badge/jsonwebtokens-EE4266?style=for-the-badge&logo=jsonwebtokens&logoColor=white"/> <img src="https://img.shields.io/badge/googlefonts-4285F4?style=for-the-badge&logo=googlefonts&logoColor=white"/> <img src="https://img.shields.io/badge/OpenWeatherApi-F6995C?style=for-the-badge&logo=&logoColor=white"/> <img src="https://img.shields.io/badge/dotenv-ECD53F?style=for-the-badge&logo=dotenv&logoColor=white"/>
<br>
<br>

## 화면 구성

| 메인페이지                                                                                                        |
| ----------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/dydgjs200/Weatherable_front/assets/121750853/614427bd-0fd8-464d-9822-f684ccfa8e63"/> |

<br>

| 옷장페이지                                                                                                        |
| ----------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/dydgjs200/Weatherable_front/assets/121750853/f4ea06d0-3d06-49f1-83e6-d8465d923cb5"/> |

<br>

| 코디페이지                                                                                                        |
| ----------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/dydgjs200/Weatherable_front/assets/121750853/eb56b197-9a24-4c90-a57a-f7b8a9f6f640"/> |

<br>

| 마이페이지                                                                                                        |                                                                                                                   | 수정페이지                                                                                                        |
| ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/dydgjs200/Weatherable_front/assets/121750853/3ce20671-427b-4c3d-95b0-ad14d1649c0f"/> | <img src="https://github.com/dydgjs200/Weatherable_front/assets/121750853/de742d58-9b18-4972-a0b2-f407a6018b38"/> | <img src="https://github.com/dydgjs200/Weatherable_front/assets/121750853/0c893c9e-bd65-4486-a170-ed1cb2139868"/> |

<br>

| 사이즈 기록 페이지                                                                                                |
| ----------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/dydgjs200/Weatherable_front/assets/121750853/dc071e70-0494-4d28-84b8-d14d4cb25a76"/> |

<br>
<br>

## 주요 기능

| AI 스타일 자동 제공 기능                                                                                          |
| ----------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/dydgjs200/Weatherable_front/assets/121750853/386c6288-a578-49e3-90ff-81d21df431f6"/> |

- When a user uploads an image file of clothing, the system retrieves the image address from Amazon S3.
- Then, the image is read and analyzed by a trained model using Teachable Machine to automatically classify the style of the clothing.
  This allows the user to immediately obtain information about the style of the clothing.

<br>

| 기상 데이터를 기반으로 한 AI 패션 추천 기능                                                                       |
| ----------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/dydgjs200/Weatherable_front/assets/121750853/2122ec2e-b35c-4eab-94a3-76a46db07421"/> |

- Based on real-time GPS location, weather temperature data, and information about all items in the user's wardrobe, the system sends this data to GPT.
  GPT then generates responses based on its implemented logic.
- These text responses are processed to suggest outfits by applying them to the items in the wardrobe and randomly selecting items that meet the specified conditions, providing outfit recommendations tailored to the current weather.
