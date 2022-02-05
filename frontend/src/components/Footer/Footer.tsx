import React from 'react';

const Footer = () => {
    const today = new Date();
    const year = today.getFullYear();

    return (
        <footer class="text-gray-700 body-font">
            <div class="bg-gray-200">
                <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
                    <span className="text-gray-500 text-sm text-center">하늘이 이미지는 공군에서 2019년 작성하여 공공누리 2유형으로 개방한 공군 하늘이를 이용하였으며, 해당 저작물은 <a href="https://afplay.kr/2180" target="_blank">공군 공감블로그</a>에서 무료로 다운받으실 수 있습니다.</span>
                </div>
                <div class="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
                    <p class="text-gray-500 text-sm text-center sm:text-left">© {year} by k4sud0n</p>
                    <span class="sm:ml-auto sm:mt-0 mt-2 sm:w-auto w-full sm:text-left text-center text-gray-500 text-sm">메일: k4sud0n@gmail.com</span>
                </div>
            </div>
        </footer>
    )
}

export default Footer;