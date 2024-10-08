# Generated by Django 4.2.16 on 2024-10-07 18:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('gestionUsuarios', '0001_initial'),
        ('gestionEscultores', '0004_mediafile_mediafile_media_file_constraint'),
    ]

    operations = [
        migrations.CreateModel(
            name='Voto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha_voto', models.DateTimeField(auto_now_add=True)),
                ('escultura', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gestionEscultores.escultura')),
                ('visitante', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gestionUsuarios.visitante')),
            ],
            options={
                'unique_together': {('visitante', 'escultura')},
            },
        ),
    ]
