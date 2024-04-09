import wget

url = 'https://25live.collegenet.com/25live/data/cpp/run/space/detail/spdetail.json?space_id='

for i in range(1, 507):
    wget.download(f"{url}{i}", f"data/space-{i}.json")