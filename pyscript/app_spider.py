#!/usr/bin/python
# -*- coding: utf-8 -*-

"""
Created on 2018-02-03 @author: Sl
功能: 爬取新浪微博用户的信息及微博评论，点赞，转发 for webSocket-server
"""

import urllib2
import json
import datetime

import sys
default_encoding = 'utf-8'
if sys.getdefaultencoding() != default_encoding:
    reload(sys)
    sys.setdefaultencoding(default_encoding)

proxy_addr = "122.241.72.191:808"


def use_proxy(url):
    req = urllib2.Request(url)
    req.add_header("User-Agent", "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.221 Safari/537.36 SE 2.X MetaSr 1.0")
    proxy = urllib2.ProxyHandler({'http': proxy_addr})
    opener = urllib2.build_opener(proxy, urllib2.HTTPHandler)
    urllib2.install_opener(opener)
    data = urllib2.urlopen(req).read().decode('utf-8', 'ignore')
    return data


# 获取微博主页的containerid，爬取微博内容时需要此id
def get_containerid(url):
    data = use_proxy(url)
    content = json.loads(data).get('data')
    for data in content.get('tabsInfo').get('tabs'):
        if (data.get('tab_type') == 'weibo'):
            containerid = data.get('containerid')
    return containerid


# 获取微博大V账号的用户基本信息，如：微博昵称、微博地址、微博头像、关注人数、粉丝数、性别、等级等
def get_userInfo(id):
    url = 'https://m.weibo.cn/api/container/getIndex?type=uid&value=' + id
    data = use_proxy(url)
    content = json.loads(data).get('data')
    guanzhu = content.get('userInfo').get('follow_count')
    name = content.get('userInfo').get('screen_name')
    fensi = content.get('userInfo').get('followers_count')
    return {'nickname': name, 'following': guanzhu, 'follower': fensi}


# 获取微博内容信息,并保存到文本中，内容包括：每条微博的内容、微博详情页面地址、点赞数、评论数、转发数等
def get_weibo(id):
    i = 1
    url = 'https://m.weibo.cn/api/container/getIndex?type=uid&value=' + id
    containerid = get_containerid(url)
    init_month = str(datetime.datetime.now().month)
    month = init_month
    print 'init_month ', init_month
    ret = {}
    break_index = 0
    while True:
        weibo_url = 'https://m.weibo.cn/api/container/getIndex?type=uid&value=' + id + '&containerid=' + containerid + '&page=' + str(i)
        try:
            data = use_proxy(weibo_url)
            content = json.loads(data).get('data')
            cards = content.get('cards')
            if len(cards) > 0:
                for j in range(len(cards)):
                    # print("-----正在爬取第" + str(i) + "页，第" + str(j) + "条微博------")
                    card_type = cards[j].get('card_type')
                    if card_type == 9:
                        mblog = cards[j].get('mblog')
                        created_at = str(mblog.get('created_at'))
                        if '小时' in created_at:
                            continue
                        else:
                            split_res = created_at.split('-')
                            now_month = split_res[0] if int(split_res[0]) <= 12 else split_res[1]
                            now_month = str(int(now_month))
                            if now_month == init_month:
                                continue
                        if now_month != month:
                            break_index += 1
                            if break_index == 4:
                                break
                            month = now_month
                            ret[str(month)] = []
                        attitudes_count = mblog.get('attitudes_count')
                        comments_count = mblog.get('comments_count')
                        reposts_count = mblog.get('reposts_count')
                        scheme = cards[j].get('scheme')
                        text = mblog.get('text')
                        temp_info = {
                            'address': str(scheme),
                            'create_time': created_at,
                            'comments_count': comments_count,
                            'attitudes_count': attitudes_count,
                            'reposts_count': reposts_count,
                            'text': text
                        }
                        ret[str(month)].append(temp_info)
            else:
                break
        except Exception as e:
            print(e)
            pass
        finally:
            if break_index == 4:
                break
            i += 1
    return ret

