# Generated by Django 4.2.16 on 2024-10-20 15:24

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('gestionEscultores', '0005_escultura_tematica'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='escultor',
            name='DNI_Adm',
        ),
        migrations.AddField(
            model_name='escultor',
            name='telefono',
            field=models.BigIntegerField(default=123),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='escultor',
            name='DNI_Esc',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
