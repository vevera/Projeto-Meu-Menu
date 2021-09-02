import base64

with open('pao_carioca.jpeg', 'rb') as f:
    photo = f.read()
    im_b64 = data.pop('photo')
    img_bytes = base64.b64decode(im_b64.encode('utf-8'))
    img = io.BytesIO(img_bytes)
    data['photo'] = img_bytes
    print(photo)