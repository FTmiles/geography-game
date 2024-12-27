
export  default function Footer(){
    const footerDom = document.querySelector('footer');
    const copyright = document.createElement('p');
    copyright.innerHTML = "Copyright &copy; 2025";
    copyright.className = "text-center";
    footerDom?.append(copyright);

}