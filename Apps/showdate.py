from winotify import Notification
from bs4 import BeautifulSoup as bs
import requests

url = 'https://www.megastudy.net/'
url_ = 'https://search.naver.com/search.naver?where=nexearch&sm=tab_etc&mra=blMy&qvt=0&query=%EA%B3%B5%EB%B6%80%20%EB%AA%85%EC%96%B8'
header = {"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36"}
path = '#megaHead2015 > div.commonGnb--loginArea.clearfix > div.commonGnb--loginArea--login > span > strong'

res = requests.get(url,headers=header)
soup = bs(res.text,'html.parser')
date = soup.select_one(path).text
res_ = requests.get(url_,headers=header)
soup_ = bs(res_.text,'html.parser')
text = soup_.select_one('#main_pack > section.sc_new.cs_famous > div > div.api_cs_wrap._famous_saying > div.cnt_box > ul:nth-child(1) > li > div:nth-child(1) > div > p.lngkr').text
writer = soup_.select_one('#main_pack > section.sc_new.cs_famous > div > div.api_cs_wrap._famous_saying > div.cnt_box > ul:nth-child(1) > li > div:nth-child(1) > dl > dt > a').text

toast = Notification(app_id = "수능까지",
                     title = date,
                     msg = f'''
                     {text}
                     -{writer}-
                     ''')

toast.build().show()