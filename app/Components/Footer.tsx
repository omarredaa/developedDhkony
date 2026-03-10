"use client";

import Image from "next/image";
import {
  FaEnvelope,
  FaPhone,
  FaFacebookF,
  FaTwitter,
  FaSnapchatGhost,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="flex justify-center items-center">
      <div className="bg-[#2b201f] text-white rounded-t-4xl p-32 w-full">
        {/* Top Grid */}
        <div className="flex justify-evenly w-lvw items-center flex-col md:flex-row gap-20 ">
          {/* Logo + Social */}
          <div className="flex justify-center items-center flex-col gap-10">
            <div className="">
              <Image src="/whiteLogo.png" alt="logo" width={200} height={40} />
            </div>

            <div className=" flex gap-2">
              <Icon>
                <FaEnvelope />
              </Icon>
              <Icon>
                <FaPhone />
              </Icon>
              <Icon>
                <FaFacebookF />
              </Icon>
              <Icon>
                <FaTwitter />
              </Icon>
              <Icon>
                <FaSnapchatGhost />
              </Icon>
              <Icon>
                <FaInstagram />
              </Icon>
              <Icon>
                <FaTiktok />
              </Icon>
            </div>

            {/* App Buttons */}
            <div className="flex gap-3">
              <Image
                src="/appStore.svg"
                alt="app store"
                width={130}
                height={40}
              />

              <Image
                src="/googlePlay.svg"
                alt="google play"
                width={130}
                height={40}
              />
            </div>
          </div>

          {/* Important Links */}
          <div className="flex justify-center items-center flex-col font-extrabold">
            <h3 className="font-extrabold mb-4 text-xl">روابط مهمة</h3>

            <ul className="space-y-2 text-gray-300">
              <li>السجل التجاري</li>
              <li>سياسة الخصوصية</li>
              <li>الشروط والأحكام</li>
              <li>سياسة الاسترجاع</li>
              <li>تراخيص التخفيضات</li>
              <li>الشهادة</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex justify-center items-center flex-col ">
            <h3 className="font-extrabold mb-4 text-xl">تواصل معنا</h3>

            <ul className="space-y-2 text-gray-300">
              <li>خدمة العملاء</li>
              <li>الموارد البشرية</li>
              <li>فروعنا</li>
              <li>مبيعات الجملة</li>
            </ul>
          </div>

          {/* VAT */}
          {/* <div className="space-y-3 ">
            <Image src="/vat.png" alt="vat" width={120} height={120} />

            <p className="text-sm text-gray-300">السجل التجاري</p>

            <p className="text-sm text-gray-300">
              الرقم الضريبي: 310779603200003
            </p>
          </div> */}
        </div>

        {/* Payment Icons */}
        {/* <div className="flex justify-center gap-4 mt-12 flex-wrap">
          <Image src="/tamara.png" alt="tamara" width={60} height={30} />
          <Image src="/tabby.png" alt="tabby" width={60} height={30} />
          <Image src="/applepay.png" alt="applepay" width={60} height={30} />
          <Image
            src="/samsungpay.png"
            alt="samsungpay"
            width={60}
            height={30}
          />
          <Image src="/visa.png" alt="visa" width={60} height={30} />
          <Image
            src="/mastercard.png"
            alt="mastercard"
            width={60}
            height={30}
          />
        </div> */}

        {/* Bottom */}
        <div className="text-center text-sm text-gray-300 mt-36">
          جميع الحقوق محفوظة لدخوني © {year}
        </div>
      </div>
    </footer>
  );
}

function Icon({ children }: any) {
  return (
    <div className="w-9 h-9 flex items-center justify-center bg-[#ffffff] text-black rounded-md cursor-pointer hover:bg-gray-200 transition p-3">
      {children}
    </div>
  );
}
