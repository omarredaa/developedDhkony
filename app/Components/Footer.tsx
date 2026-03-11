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
          <div className="flex flex-col items-center md:items-start gap-4">
            <Image src="/vmt.svg" alt="السجل التجاري" width={80} height={80} />

            <p className="text-gray-300 text-sm">السجل التجاري:</p>

            <p className="text-gray-300 text-sm">
              الرقم الضريبي: 310796032000003
            </p>
          </div>
        </div>

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

// "use client";

// import Image from "next/image";
// import {
//   FaEnvelope,
//   FaPhone,
//   FaFacebookF,
//   FaTwitter,
//   FaSnapchatGhost,
//   FaInstagram,
//   FaTiktok,
// } from "react-icons/fa";

// export default function Footer() {
//   const year = new Date().getFullYear();

//   return (
//     <footer className="flex justify-center items-center w-full">
//       <div className="bg-[#2b201f] text-white rounded-t-[40px] w-full px-6 py-16 md:px-20">
//         {/* Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-right items-start">
//           {/* Logo + Social */}
//           <div className="flex flex-col items-center md:items-start gap-8">
//             <Image src="/whiteLogo.png" alt="logo" width={200} height={40} />

//             {/* Social Icons */}
//             <div className="flex gap-2">
//               <Icon>
//                 <FaEnvelope />
//               </Icon>
//               <Icon>
//                 <FaPhone />
//               </Icon>
//               <Icon>
//                 <FaFacebookF />
//               </Icon>
//               <Icon>
//                 <FaTwitter />
//               </Icon>
//               <Icon>
//                 <FaSnapchatGhost />
//               </Icon>
//               <Icon>
//                 <FaInstagram />
//               </Icon>
//               <Icon>
//                 <FaTiktok />
//               </Icon>
//             </div>

//             {/* App Buttons */}
//             <div className="flex gap-3">
//               <Image
//                 src="/appStore.svg"
//                 alt="app store"
//                 width={130}
//                 height={40}
//               />

//               <Image
//                 src="/googlePlay.svg"
//                 alt="google play"
//                 width={130}
//                 height={40}
//               />
//             </div>
//           </div>

//           {/* Important Links */}
//           <div>
//             <h3 className="font-bold mb-4 text-lg">روابط مهمة</h3>

//             <ul className="space-y-2 text-gray-300">
//               <li className="cursor-pointer hover:text-white">السجل التجاري</li>
//               <li className="cursor-pointer hover:text-white">
//                 سياسة الخصوصية
//               </li>
//               <li className="cursor-pointer hover:text-white">
//                 الشروط والأحكام
//               </li>
//               <li className="cursor-pointer hover:text-white">
//                 سياسة الاسترجاع
//               </li>
//               <li className="cursor-pointer hover:text-white">
//                 تراخيص التخفيضات
//               </li>
//               <li className="cursor-pointer hover:text-white">الشهادة</li>
//             </ul>
//           </div>

//           {/* Contact */}
//           <div>
//             <h3 className="font-bold mb-4 text-lg">تواصل معنا</h3>

//             <ul className="space-y-2 text-gray-300">
//               <li className="cursor-pointer hover:text-white">خدمة العملاء</li>
//               <li className="cursor-pointer hover:text-white">
//                 الموارد البشرية
//               </li>
//               <li className="cursor-pointer hover:text-white">فروعنا</li>
//               <li className="cursor-pointer hover:text-white">مبيعات الجملة</li>
//             </ul>
//           </div>

//           {/* Commercial Registration */}
//           <div className="flex flex-col items-center md:items-start gap-4">
//             <Image src="/vmt.svg" alt="السجل التجاري" width={80} height={80} />

//             <p className="text-gray-300 text-sm">السجل التجاري:</p>

//             <p className="text-gray-300 text-sm">
//               الرقم الضريبي: 310796032000003
//             </p>
//           </div>
//         </div>

//         {/* Bottom */}
//         <div className="text-center text-sm text-gray-400 mt-16 border-t border-gray-700 pt-6">
//           جميع الحقوق محفوظة لدخوني © {year}
//         </div>
//       </div>
//     </footer>
//   );
// }

// function Icon({ children }: any) {
//   return (
//     <div className="w-9 h-9 flex items-center justify-center bg-white text-black rounded-md cursor-pointer hover:bg-gray-200 transition">
//       {children}
//     </div>
//   );
// }
