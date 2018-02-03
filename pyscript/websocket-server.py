#!/usr/bin/python
# -*- coding: utf-8 -*-

import tornado.web
import tornado.websocket
import tornado.httpserver
import tornado.ioloop
from tornado.options import define, options
import json

from app_spider import get_weibo
from app_spider import get_userInfo

define("port", default=9999, help="run on the given port", type=int)
tornado.options.parse_command_line()


class DetailHandler(tornado.websocket.WebSocketHandler):

    def __init__(self, application, request, **kwargs):
        super(DetailHandler, self).__init__(application, request, **kwargs)
        self.detail_data = {}
        self.weibo_ids = {}
        teams = ['B', 'E', 'J']
        for team in teams:
            with open('detail-json/' + team + '.json', 'r') as f:
                res = json.load(f)
                self.detail_data[team] = res
        with open('detail-json/weibo_id.json', 'r') as f:
            res = json.load(f)
            self.weibo_ids = res

    def data_received(self, chunk):
        print u'data_received'
        pass

    def check_origin(self, origin):
        return True

    def open(self):
        print 'WebSocket connection build'
        res = self.detail_data['J']
        self.write_message({'info': res, 'type': 'detail'})

    def on_message(self, message):
        print 'message: ', message
        message_parse = message.split('|')
        query_type = message_parse[0]
        if query_type == '0':
            res = self.detail_data['J']
            self.write_message({'info': res, 'type': 'detail'})
        elif query_type == '1':
            # there get the weibo data by spider
            member_index = message_parse[1]
            if member_index in self.weibo_ids:
                weibo_id = self.weibo_ids[member_index]
                base_info = get_userInfo(weibo_id)
                weibo_info = get_weibo(weibo_id)
                self.write_message({'baseInfo': base_info, 'weiboInfo': weibo_info, 'type': 'weibo'})
            else:
                self.write_message({'type': 'not found data'})

    def on_close(self):
        print 'WebSocket disconnected'


class Application(tornado.web.Application):
    def __init__(self):
        handlers = [
            (r'/detail', DetailHandler)
        ]
        settings = {"template_path": "."}
        tornado.web.Application.__init__(self, handlers, **settings)


if __name__ == '__main__':
    ws_app = Application()
    server = tornado.httpserver.HTTPServer(ws_app)
    server.listen(options.port)
    print 'WebSocket server is open on port', options.port
    tornado.ioloop.IOLoop.instance().start()