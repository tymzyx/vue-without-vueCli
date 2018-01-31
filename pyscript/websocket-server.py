# coding = utf-8

import tornado.web
import tornado.websocket
import tornado.httpserver
import tornado.ioloop
from tornado.options import define, options
import json

define("port", default=9999, help="run on the given port", type=int)
tornado.options.parse_command_line()


class DetailHandler(tornado.websocket.WebSocketHandler):

    def __int__(self):
        self.data = []

    def data_received(self, chunk):
        print u'data_received'
        pass

    def check_origin(self, origin):
        return True

    def open(self):
        print 'WebSocket connection build'

    def on_message(self, message):
        print 'message: ', message
        message_parse = message.split('|')
        query_type = message_parse[0]
        if query_type == '0':
            with open('detail-json/J.json', 'r') as f:
                res = json.load(f)
            self.write_message(res)


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